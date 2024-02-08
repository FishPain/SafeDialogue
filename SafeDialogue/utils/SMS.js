import { useEffect, useState } from "react";
import { PermissionsAndroid, NativeModules } from "react-native";

const SmsModule = NativeModules.SmsModule;

const requestSMSPermission = async () => {
  let permissionsGranted = false;

  const hasReceiveSMSPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
  );
  const hasReadSMSPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_SMS
  );

  if (!hasReceiveSMSPermission) {
    const receivePermissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "SMS Permission",
        message: "This app needs access to your SMS to detect scams.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    permissionsGranted =
      receivePermissionGranted == PermissionsAndroid.RESULTS.GRANTED;
  }

  if (!hasReadSMSPermission && permissionsGranted) {
    const readPermissionGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: "Read SMS Permission",
        message: "This app needs access to read your SMS for scam detection.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    permissionsGranted =
      readPermissionGranted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return permissionsGranted;
};

const readSMS = async () => {
  var filter = {
    box: "inbox", // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    /**
     *  the next 3 filters can work together, they are AND-ed
     *
     *  minDate, maxDate filters work like this:
     *    - If and only if you set a maxDate, it's like executing this SQL query:
     *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
     *    - Same for minDate but with "date >= minDate"
     */
    // minDate: 1554636310165, // timestamp (in milliseconds since UNIX epoch)
    // maxDate: 1556277910456, // timestamp (in milliseconds since UNIX epoch)
    // bodyRegex: "*", // content regex to match

    /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
    // read: 0, // 0 for unread SMS, 1 for SMS already read
    // _id: 1234, // specify the msg id
    // thread_id: 12, // specify the conversation thread_id
    // address: "+1888------", // sender's phone number
    // body: "How are you", // content to match
    // /** the next 2 filters can be used for pagination **/
    // indexFrom: 0, // start from index 0
    // maxCount: 10, // count of SMS to return each time
  };
  try {
    SmsModule.list(
      JSON.stringify(filter),
      (fail) => {
        console.log("Failed with this error: " + fail);
      },
      (count, smsList) => {
        console.log("Count: ", count);
        console.log("List: ", smsList);
        var arr = JSON.parse(smsList);

        arr.forEach(function (object) {
          console.log("Object: " + object);
          console.log("-->" + object.date);
          console.log("-->" + object.body);
        });
      }
    );
  } catch (error) {
    console.log("err", JSON.stringify(error));
  }
};

export { requestSMSPermission, readSMS };
