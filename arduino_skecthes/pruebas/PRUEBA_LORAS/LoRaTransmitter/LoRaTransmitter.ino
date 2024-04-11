
#include <SPI.h>
#include <LoRa.h> 
#include <MPU9250_asukiaaa.h>
#include <Adafruit_BMP280.h>

Adafruit_BMP280 bme; // I2C
MPU9250_asukiaaa mySensor;
float aX, aY, aZ, aSqrt, gX, gY, gZ, mDirection, mX, mY, mZ;
byte paquete[14 * sizeof(float)];

float val[14];
 
void setup() {
  //Serial.begin(9600);
  
  while (!Serial);  
  //Serial.println("LoRa Sender");
  if (!LoRa.begin(915E6)) { // or 915E6, the MHz speed of yout module
    //Serial.println("Starting LoRa failed!");
    while (1);
  }

//LoRa.setSpreadingFactor(7);
#ifdef ESP32_HAL_I2C_H // For ESP32
  Wire.begin(SDA_PIN, SCL_PIN);
  mySensor.setWire(&Wire);
#else
  Wire.begin();
  mySensor.setWire(&Wire);
#endif

  bme.begin(0x76);
  mySensor.beginAccel();
  mySensor.beginGyro();
  mySensor.beginMag();  

}
 
void loop() {
  //asd();
  
  /*for (int i = 0; i < 14; i++) {
    memcpy(&paquete[i * sizeof(float)], &val[i], sizeof(float));
  }*/
  /*Serial.print("aceleracion: ");
  Serial.print(String(val[0]) + " ");
  Serial.print(String(val[1]) + " ");
  Serial.print(String(val[2]) + " ");
  Serial.print(val[3]);
  Serial.println("");
  
  Serial.print("giroscopio: ");
  Serial.print(String(val[4]) + " ");
  Serial.print(String(val[5]) + " ");
  Serial.print(val[6]);
  Serial.println("");

  Serial.print("magnetometro: ");
  Serial.print(String(val[7]) + " ");
  Serial.print(String(val[8]) + " ");
  Serial.print(String(val[9]) + " ");
  Serial.print(val[10]);
  Serial.println("");

  Serial.print("OtrosValores: ");
  Serial.print(String(val[11]) + " ");
  Serial.print(String(val[12]) + " ");
  Serial.print(val[13]);
  Serial.println("");*/

  //Desempaquetar el arreglo
    /*for (int i = 0; i < 13; i++) {
      memcpy(&val[i], &paquete[i * sizeof(float)], sizeof(float));
    }
     Serial.println("Datos recibidos:");
    for (int i = 0; i < 14; i++) {
      Serial.print(val[i]);
      Serial.print(" ");
    }*/

  LoRa.beginPacket();  
  LoRa.print("asd");
  //LoRa.write(paquete, 14 * sizeof(float));
  LoRa.endPacket();
  //Serial.println("Se envia");
}

void asd() {

  if (mySensor.accelUpdate() == 0) {
    aX = mySensor.accelX();
    val[0] = aX;
    aY = mySensor.accelY();
    val[1] = aY;
    aZ = mySensor.accelZ();
    val[2] = aZ;
    aSqrt = mySensor.accelSqrt();
    val[3] = aSqrt;
    /*Serial.print("accelX: " + String(aX));
    Serial.print("\taccelY: " + String(aY));
    Serial.print("\taccelZ: " + String(aZ));
    Serial.print("\taccelSqrt: " + String(aSqrt));*/
  }

  if (mySensor.gyroUpdate() == 0) {
    gX = mySensor.gyroX();
    val[4] = gX;
    gY = mySensor.gyroY();
    val[5] = gY;
    gZ = mySensor.gyroZ();
    val[6] = gZ;
    /*Serial.print("\tgyroX: " + String(gX));
    Serial.print("\tgyroY: " + String(gY));
    Serial.print("\tgyroZ: " + String(gZ));*/
  }

  if (mySensor.magUpdate() == 0) {
    mX = mySensor.magX();
    val[7] = mX;
    mY = mySensor.magY();
    val[8] = mY;
    mZ = mySensor.magZ();
    val[9] = mZ;
    mDirection = mySensor.magHorizDirection();
    val[10] = mDirection;
    /*Serial.print("\tmagX: " + String(mX));
    Serial.print("\tmaxY: " + String(mY));
    Serial.print("\tmagZ: " + String(mZ));
    Serial.print("\thorizontalDirection: " + String(mDirection));*/
  }

  //Serial.print("\tTemperature(*C): ");
  //Serial.print(bme.readTemperature());
  val[11] = bme.readTemperature();
  //Serial.print("\tPressure(Inches(Hg)): ");
  //Serial.print(bme.readPressure()/3377);
  val[12] = (bme.readPressure()/3377);

  //Serial.print("\tApproxAltitude(m): ");
  //Serial.print(bme.readAltitude(1014.5)); // this should be adjusted to your local forcase // 1004.25 -> 39° // 1013.25 -> defecto //  1014.5 -> 35° 
  val[13] = bme.readAltitude(1014.5);
  //Serial.println(""); // Add an empty line
}