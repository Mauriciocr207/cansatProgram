#include <SPI.h>
#include <LoRa.h>
#define TRANSMISSION_INTERVAL 5000 // Intervalo de transmisión: 5000 milisegundos (5 segundos)
#define LISTEN_TIME 6000           // Tiempo de escucha: 6000 milisegundos (6 segundos)
unsigned long tiempoUltimaTransmision = 0; 
String inString = "";    // string to hold input
String val_1;
float val[14];
byte paquete[14 * sizeof(float)];
void setup() {
  Serial.begin(9600);
  
  
  while (!Serial);
  Serial.println("LoRa Receiver");
  if (!LoRa.begin(915E6)) { // or 915E6
    Serial.println("Starting LoRa failed!");
    while (1);
  }
  //LoRa.setSpreadingFactor(7);
}
 
void loop() {
  unsigned long tiempoActual = millis();
  // try to parse packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) { 
    // read packet    
    while (LoRa.available())
    {
      char incoming = (char)LoRa.read();
      Serial.print(incoming);     
    }
    Serial.println("");        
  }
}
  //val += 1;    
  //Serial.println(tiempoActual);
  
  /*if (LoRa.parsePacket()) {
    // Leer el paquete recibido
    
    int bytesRead = LoRa.readBytes(paquete, 14 * sizeof(float));

    // Desempaquetar el arreglo
    for (int i = 0; i < 13; i++) {
      memcpy(&val[i], &paquete[i * sizeof(float)], sizeof(float));
    }

    // Procesar los datos recibidos
    Serial.println("Datos recibidos:");
    for (int i = 0; i < 14; i++) {
      Serial.print(val[i]);
      Serial.print(" ");
    }
    Serial.println(""); 
     
  }
}

/*#include <SPI.h>
#include <LoRa.h>

#define TRANSMISSION_INTERVAL 5000 // Intervalo de transmisión: 5000 milisegundos (5 segundos)
#define LISTEN_TIME 6000           // Tiempo de escucha: 6000 milisegundos (6 segundos)

unsigned long tiempoUltimaTransmision = 0;
String inString = "";    // string to hold input
float val[14];
byte paquete[14 * sizeof(float)];

void setup() {
  Serial.begin(9600);
  while (!Serial);
  Serial.println("LoRa Receiver");

  if (!LoRa.begin(915E6)) { // or 915E6
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  unsigned long tiempoActual = millis();

  // Aumenta el tiempo de escucha manualmente
  LoRa.receive(); // Pasa a modo de recepción

  unsigned long tiempoInicio = millis();
  unsigned long tiempoPasado = 0;

  while (tiempoPasado < LISTEN_TIME) {
    int packetSize = LoRa.parsePacket();
    if (packetSize) {
      Serial.print(String(LoRa.read()));
      // Leer el paquete recibido
      /*int bytesRead = LoRa.readBytes(paquete, 14 * sizeof(float));

      // Desempaquetar el arreglo
      for (int i = 0; i < 14; i++) {
        memcpy(&val[i], &paquete[i * sizeof(float)], sizeof(float));
      }

      // Procesar los datos recibidos
      Serial.println("Datos recibidos:");
      for (int i = 0; i < 14; i++) {
        Serial.print(val[i]);
        Serial.print(" ");
      }
      Serial.println("");
    }

    // Actualiza el tiempo pasado
    tiempoPasado = millis() - tiempoInicio;
  }

  // Fin del tiempo de escucha, vuelve a transmitir
  tiempoUltimaTransmision = millis(); // Actualiza el tiempo de la última transmisión
}*/