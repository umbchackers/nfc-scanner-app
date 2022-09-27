import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

class NfcTagManager {
    async readNdef() {
        return new Promise(async (resolve) => {
        var nfcTag = '';
        try {
          // register for the NFC tag with NDEF in it
          await NfcManager.requestTechnology(NfcTech.Ndef);
          // the resolved tag object will contain `ndefMessage` property
          const tag = await NfcManager.getTag();
          nfcTag = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
        } catch (ex) {
          console.log('Oops!', ex);
        } finally {
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
        }
        resolve(nfcTag);
        });
    }

    writeTagID(id, setModalContent) {
      return new Promise(async (resolve) => {
        var nfcID = id;
        var error = 'No Error';

        setModalContent("Awaiting Scan to write to tag...");
        
        let result = false;
        try {
            await NfcManager.requestTechnology(NfcTech.Ndef);

            const bytes = Ndef.encodeMessage([Ndef.textRecord(nfcID)]);
            
            if(bytes) {
                await NfcManager.ndefHandler
                .writeNdefMessage(bytes)
                result = true
                setModalContent('Written Successfully');
            } else {
                error = 'Failed to encode tag ID.';
                setModalContent(error);
            }
        } catch (ex) {
            error = 'NFC Write Failed: ' + ex ;
            setModalContent(error);
            resolve(error);
        } finally {
            NfcManager.cancelTechnologyRequest();
            resolve(error);
        }
      });
    }

    lockNFCTag(setModalContent) {
      return new Promise(async (resolve) => {
        setModalContent('Awaiting Scan to lock tag...');
        try {
            await NfcManager.requestTechnology([NfcTech.Ndef]);
            await NfcManager.ndefHandler.makeReadOnly();
      
            result = true;
          } catch (ex) {
            console.warn(ex);
            handleException(ex);
            resolve('Failed to lock NFC Tag' + ex);
          } finally {
            NfcManager.cancelTechnologyRequest();
          }
        resolve('No Error');
        });
    }
}

export default new NfcTagManager();