#include <SPI.h>
#include <RF24.h>
#include <ArduinoJson.h>
#include <MPU9250_asukiaaa.h>
#include <Adafruit_BMP280.h>
#include <TinyGPS++.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

// JSON DOCUMENT
StaticJsonDocument<200> doc;
// // GY91
Adafruit_BMP280 bmp; // I2C
MPU9250_asukiaaa mpu;
// NRF24L01
RF24 radio(9, 10); // Pins CE y CSN del módulo NRF24L01
const byte primaria_tierra[] = "155555"; // Direccion entre la carga primaria y tierra
// para un paquete es de 32 bytes
const int PACKET_SIZE = 32; // Tamaño máximo del paquete de datos
//  GPS
TinyGPSPlus gps;
SoftwareSerial gps_serial( 5,6 ); // -> Tx , Rx

void setup() {
  // Se inicia comunicacion serial
  Serial.begin(115200);
  gps_serial.begin(115200);

  // Verificamos el funcionamiento del módulo
  if(!radio.begin()) Serial.println("NRF24 is not responding");
  else Serial.println("OK");

  // radio.setChannel(115);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_HIGH);
  radio.enableDynamicPayloads(); // Habilita el modo de datos dinámico
  radio.openWritingPipe(primaria_tierra); // Se setea la dirección del envío de datos
  radio.openReadingPipe(1, primaria_tierra); // Dirección de la recepción de datos
  radio.startListening();

  // Iniciamos los sensores
  // BMP280
  bmp.begin();
  // MPU9250
  mpu.beginAccel();
  mpu.beginGyro();
  mpu.beginMag();

}


void loop() {
  //== TRANSMISOR ==//
  // Cargamos datos
  // MPU9250
  mpuUpdateData();
  // BMP
  bmpUpdateData();
  // GPS
  // while (gps_serial.available() > 0) {
  //   Serial.print(gps_serial.read());
  //   if (gps.encode(gps_serial.read())) {
  //     if (gps.location.isUpdated()) {
  //       // Lectura de datos GPS
  //       float lat = gps.location.lat();
  //       float lon = gps.location.lng();
  //       float alt = gps.altitude.meters();
        
  //       // Envío de datos a través de la comunicación serial
  //       Serial.print("Latitud: ");
  //       Serial.println(lat, 6);
  //       Serial.print("Longitud: ");
  //       Serial.println(lon, 6);
  //       Serial.print("Altitud: ");
  //       Serial.println(alt);
  //     }
  //   }
  // }
  

  // Serializamos el json y lo enviamos a través de nrf24l01
  String msg;
  int buff = serializeJson(doc, msg);
  Serial.print(buff);
  Serial.print("Enviando mensaje: ");
  Serial.println(msg);
  sendMessage(msg);

  radioAvailable();
}

void sendMessage(String input) {
  // Creamos un array de chars de longitud del string de entrada
  char message[input.length() + 1];
  // Calculamos el tamaño del array
  int messageSize = sizeof(message);
  // Copiamos el string en el array de chars
  input.toCharArray(message, sizeof(message));
  
  // Calculamos cuántos paquetes debemos enviar si el tamaño máximo de bytes
  int totalPackets = ceil((float)messageSize / PACKET_SIZE);
  
  // Enviamos cada paquete por separado
  int currentPacket = 1;
  // Iteramos cada paquete
  for (int i = 0; i < messageSize; i += PACKET_SIZE) {
    // Creamos un array del tamaño del paquete máximo posible (32 bytes)
    char packet[PACKET_SIZE];
    // Calculamos la longitud del paquete actual que se enviará 
    int packetSize = min(PACKET_SIZE, messageSize - i);
    // se copia cada caracter de message en packet
    memcpy(packet, &message[i], packetSize);
    
    // Detenemos la escucha 
    radio.stopListening();
    // Enviamos mensaje
    radio.write(&packet, packetSize);
    // Escuchamos de nuevo
    radio.startListening();
    
    // Serial.println("Paquete " + String(currentPacket) + " de " + String(totalPackets) + " enviado");
    // Aumentamos el valor del paquete
    currentPacket++;

    // Pequeña pausa entre paquetes
    delay(10); 
  }
  
  // Serial.println("Mensaje completo enviado");
}

void radioAvailable() {
  if (radio.available()) {
    // Se crea un arreglo de caracteres 
    char packet[PACKET_SIZE];
    // Se copia el mensaje recibido en el arreglo packet
    radio.read(&packet, sizeof(packet));
    String msg_input = String(packet);
    doc.clear();
    doc["mensaje_recibido"] = msg_input;
    String msg_output;
    serializeJson(doc, msg_output);
    sendMessage(msg_output);
    doc.clear();
  }
}

void mpuUpdateData() {
  if(mpu.accelUpdate() == 0) {
    doc["accel"]["x"] = mpu.accelX();
    doc["accel"]["y"] = mpu.accelY();
    doc["accel"]["z"] = mpu.accelZ();
  }
  if(mpu.gyroUpdate() == 0) {
    doc["gyro"]["x"] = mpu.gyroX();
    doc["gyro"]["y"] = mpu.gyroY();
    doc["gyro"]["z"] = mpu.gyroZ();
  }
  if(mpu.magUpdate() == 0) {
    doc["mag"]["x"] = mpu.magX();
    doc["mag"]["y"] = mpu.magY();
    doc["mag"]["z"] = mpu.magZ();
  }
}

void bmpUpdateData() {
  doc["temperature"] = bmp.readTemperature();
  doc["pressure"] = bmp.readPressure()/3377;
  doc["altitude"] = bmp.readAltitude(1013.25);
}

void gpsUpdateData() {
  doc["gps"]["lat"] = String(gps.location.lat(),6);
  doc["gps"]["long"] = String(gps.location.lng(),6);
  doc["gps"]["alt"] = gps.altitude.meters();
}

