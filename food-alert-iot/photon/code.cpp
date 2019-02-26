int forceResistor1 = A0;
int power1 = A1;
int previousReading1 = 0;
int forceResistor2 = A2;
int power2 = A3;
int previousReading2 = 0;
char publishString[64];

IPAddress server(35, 184, 234, 83);

void publishWeight(char* kind, int weight) {
    sprintf(publishString,"{\"weight\": %u, \"kind\": \"%s\"}", weight, kind);
    Particle.publish("weight", publishString);
}

void publishSnapPicture() {
    TCPClient client;
	if (client.connect(server, 3000)) {
      client.write("GET / HTTP/1.1\r\n");
      client.write("Host: my-server-url.com\r\n");
      client.write("\r\n");
	} else {
	  Particle.publish("Cannot find Server for pictures.");
	}
}

int setupResistor(char* kind, int forceResistor, int power) {
    pinMode(forceResistor, INPUT);
    pinMode(power, OUTPUT);
    digitalWrite(power, HIGH);
  
    int reading = analogRead(forceResistor);
    publishWeight(kind, reading);
    return reading;
}

void setup() {
    previousReading1 = setupResistor("pop-tarts-blueberry", forceResistor1, power1);
    previousReading2 = setupResistor("pop-tarts-strawberry", forceResistor2, power2);
}

int publishEvents(char* kind, int forceResistor, int previousReading) {
    int current = analogRead(forceResistor);
    publishWeight(kind, current);
    
    if (abs(current - previousReading) > 200) {
        publishSnapPicture();
    }
    
    return current;
}

void loop() {
    previousReading1 = publishEvents("pop-tarts-blueberry", forceResistor1, previousReading1);
    previousReading2 = publishEvents("pop-tarts-strawberry", forceResistor2, previousReading2);

    delay(2000);
}

