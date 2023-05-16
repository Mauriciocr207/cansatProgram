#include <SPI.h>
#include <RF24.h>
#include <ArduinoJson.h>
// JSON DOCUMENT
StaticJsonDocument<200> doc;
// NRF24L01
RF24 radio(9, 10);                        // Pins CE y CSN del módulo NRF24L01
const byte primaria_tierra[] = "155555";  // Direccion entre la carga primaria y tierra
// para un paquete es de 32 bytes
const int PACKET_SIZE = 32;  // Tamaño máximo del paquete de datos
void setup() {
  // Se inicia comunicacion serial
  Serial.begin(115200);
  // Verificamos el funcionamiento del módulo
  if (!radio.begin()) Serial.println("NRF24 is not responding");
  else Serial.println("OK");
  // radio.setChannel(115);
  radio.setDataRate(RF24_2MBPS);
  radio.setPALevel(RF24_PA_HIGH);
  radio.enableDynamicPayloads();              // Habilita el modo de datos dinámico
  radio.openWritingPipe(primaria_tierra);     // Se setea la dirección del envío de datos
  radio.openReadingPipe(1, primaria_tierra);  // Dirección de la recepción de datos
  radio.startListening();
}

void loop() {
  //== RECEPTOR ==//
  // En caso de que haya un mensaje disponible
  radioAvailable();
  if (Serial.available()) {
    String frase = Serial.readStringUntil('\n');
    sendMessage(frase);
  }
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
    // Iteramos cada caracter del paquete
    for (int i = 0; i < sizeof(packet); i++) {
      // Si el caracter es igual al caracter de terminación('\0') o a un
      // enter('\n') se finaliza la escritura de datos en el Serial
      if (packet[i] == '\0' || packet[i] == '\n') {
        Serial.println("");
        break;
      }
      // Se imprime el paquete al Serial
      Serial.write(packet[i]);
    }
  }
}
