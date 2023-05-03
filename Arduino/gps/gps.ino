#include <TinyGPS++.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>
TinyGPSPlus gps;
SoftwareSerial gps_serial( 5,6 ); // -> Tx , Rx

void setup() {
  Serial.begin(9600);
  gps_serial.begin( 9600 );
}

void loop() {

  while(gps_serial.available()) {
    gps.encode( gps_serial.read() );
  }
  if(gps.location.isUpdated()) {
    Serial.print("LAT="); Serial.println( gps.location.lat(),6 );
    Serial.print("LONG="); Serial.println( gps.location.lng(),6 );
    Serial.print("ALT="); Serial.println( gps.altitude.meters() );
    
  }
delay(500);
}
