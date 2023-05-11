
#include <SPI.h>
#include <RF24.h>

RF24 radio(9, 10); // Pins CE y CSN del módulo NRF24L01

const byte primaria_tierra[] = "000001"; // Direcciones de los transmisores
const int PACKET_SIZE = 32; // Tamaño máximo del paquete

int contador = 0;

void setup() {
  // Se inicia comunicacion serial
  Serial.begin(9600);

  if(!radio.begin()) Serial.println("NRF24 is not responding");
  else Serial.println("OK");

  // radio.setChannel(115);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_HIGH);

  radio.enableDynamicPayloads(); // Habilita el modo de datos dinámico
  radio.openWritingPipe(primaria_tierra);
  radio.openReadingPipe(0, primaria_tierra); // Dirección del receptor
  radio.startListening();
}

void loop() {
  if (Serial.available()) {
    char message[96];
    int messageSize = Serial.readBytes(message, sizeof(message));
    // Serial.println(messageSize);
    int totalPackets = ceil((float)messageSize / PACKET_SIZE);
    int currentPacket = 1;
    
    for (int i = 0; i < messageSize; i += PACKET_SIZE) {
      char packet[PACKET_SIZE];
      int packetSize = min(PACKET_SIZE, messageSize - i);
      memcpy(packet, &message[i], packetSize);
      
      radio.stopListening();
      radio.write(&packet, packetSize);
      radio.startListening();
      
      // Serial.println("Paquete " + String(currentPacket) + " de " + String(totalPackets) + " enviado");
      currentPacket++;
      
      delay(10); // Pequeña pausa entre paquetes
    }
    
    // Serial.println("Mensaje completo enviado");
  }
  // String value = "123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_123456789_";
  // String value = String(contador);
  // char text[value.length()+1];
  // value.toCharArray(text, value.length() + 1);
  // radio.stopListening();
  // radio.write(&text, sizeof(text));
  // radio.startListening();
  // Serial.println(text);
  

  if (radio.available()) {
    char packet[PACKET_SIZE];
    radio.read(&packet, sizeof(packet));
    
    for (int i = 0; i < sizeof(packet); i++) {
      if (packet[i] == '\0') {
        Serial.println("");
        break;
      }
      Serial.write(packet[i]);
    }
  }
  // delay(10);
  contador++;
}
