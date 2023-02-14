
This week I set out to create an original Arduino project so I could test my current knowledge. I chose to modify the buzzer project from the examples so I could create my own project whilst continuing the examples. I found the notes and frequencies for the super mario brothers theme online, and made it play on the buzzer. I also added a potentiometer to control the speed of the song, and I added two buttons to increase and decrease the octave. Wiring was simple, as there are little ways to do it, the coding was the hard part.

![Garage Door FSM Diagram](/assets/Arduino_Buzzer.jpg)

 I did not know what values the potentiometer sends, and had to use trial and error to find the right range of speed. I did this by dividing the potentiometer value by larger numbers until the song could go fast and slow. That was simple enough - the buttons where harder though. After a quick google search to figure out what an octave is in frequencies, I had to find a way to multiply and divide the frequency by 2. I first tried to do this by creating a new variable for the played frequency but the frequency changes after every note, and I had no good way to change that in the variable. After too much thinking, I created a multiplier value for the frequency, and multiplied and divided the value when the buttons were pressed. This worked for the most part, but when the octave down button was pressed, the song continually dropped octaves instead of dropping it once. I have not found a solution to this problem as the current solution took too long. When I look back on it now, what I did was an easy solution. Finishing the project would have been nice, but it was not the goal. I successfully tested my current knowledge, and I have the basics down. The only thing I need to work on is remembering semi-colons -_-. The code is below:

 {% highlight C++ %}
int alarm = 11;
int potent = A0;
int upoctave = 10;
int downoctave = 9;
float note = 1;

#define NOTE_B0  31
#define NOTE_C1  33
#define NOTE_CS1 35
#define NOTE_D1  37
#define NOTE_DS1 39
#define NOTE_E1  41
#define NOTE_F1  44
#define NOTE_FS1 46
#define NOTE_G1  49
#define NOTE_GS1 52
#define NOTE_A1  55
#define NOTE_AS1 58
#define NOTE_B1  62
#define NOTE_C2  65
#define NOTE_CS2 69
#define NOTE_D2  73
#define NOTE_DS2 78
#define NOTE_E2  82
#define NOTE_F2  87
#define NOTE_FS2 93
#define NOTE_G2  98
#define NOTE_GS2 104
#define NOTE_A2  110
#define NOTE_AS2 117
#define NOTE_B2  123
#define NOTE_C3  131
#define NOTE_CS3 139
#define NOTE_D3  147
#define NOTE_DS3 156
#define NOTE_E3  165
#define NOTE_F3  175
#define NOTE_FS3 185
#define NOTE_G3  196
#define NOTE_GS3 208
#define NOTE_A3  220
#define NOTE_AS3 233
#define NOTE_B3  247
#define NOTE_C4  262
#define NOTE_CS4 277
#define NOTE_D4  294
#define NOTE_DS4 311
#define NOTE_E4  330
#define NOTE_F4  349
#define NOTE_FS4 370
#define NOTE_G4  392
#define NOTE_GS4 415
#define NOTE_A4  440
#define NOTE_AS4 466
#define NOTE_B4  494
#define NOTE_C5  523
#define NOTE_CS5 554
#define NOTE_D5  587
#define NOTE_DS5 622
#define NOTE_E5  659
#define NOTE_F5  698
#define NOTE_FS5 740
#define NOTE_G5  784
#define NOTE_GS5 831
#define NOTE_A5  880
#define NOTE_AS5 932
#define NOTE_B5  988
#define NOTE_C6  1047
#define NOTE_CS6 1109
#define NOTE_D6  1175
#define NOTE_DS6 1245
#define NOTE_E6  1319
#define NOTE_F6  1397
#define NOTE_FS6 1480
#define NOTE_G6  1568
#define NOTE_GS6 1661
#define NOTE_A6  1760
#define NOTE_AS6 1865
#define NOTE_B6  1976
#define NOTE_C7  2093
#define NOTE_CS7 2217
#define NOTE_D7  2349
#define NOTE_DS7 2489
#define NOTE_E7  2637
#define NOTE_F7  2794
#define NOTE_FS7 2960
#define NOTE_G7  3136
#define NOTE_GS7 3322
#define NOTE_A7  3520
#define NOTE_AS7 3729
#define NOTE_B7  3951
#define NOTE_C8  4186
#define NOTE_CS8 4435
#define NOTE_D8  4699
#define NOTE_DS8 4978
int melody[] = {
  NOTE_E7, NOTE_E7, 0, NOTE_E7,
  0, NOTE_C7, NOTE_E7, 0,
  NOTE_G7, 0, 0,  0,
  NOTE_G6, 0, 0, 0,

  NOTE_C7, 0, 0, NOTE_G6,
  0, 0, NOTE_E6, 0,
  0, NOTE_A6, 0, NOTE_B6,
  0, NOTE_AS6, NOTE_A6, 0,

  NOTE_G6, NOTE_E7, NOTE_G7,
  NOTE_A7, 0, NOTE_F7, NOTE_G7,
  0, NOTE_E7, 0, NOTE_C7,
  NOTE_D7, NOTE_B6, 0, 0,

  NOTE_C7, 0, 0, NOTE_G6,
  0, 0, NOTE_E6, 0,
  0, NOTE_A6, 0, NOTE_B6,
  0, NOTE_AS6, NOTE_A6, 0,

  NOTE_G6, NOTE_E7, NOTE_G7,
  NOTE_A7, 0, NOTE_F7, NOTE_G7,
  0, NOTE_E7, 0, NOTE_C7,
  NOTE_D7, NOTE_B6, 0, 0
};
int tempo[] = {
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  9, 9, 9,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  9, 9, 9,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
};

void setup() {
  // put your setup code here, to run once:
  pinMode(alarm, OUTPUT);
  pinMode(upoctave, INPUT);
  pinMode(downoctave, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  for (int i = 0; i < 78; i++){
    if (digitalRead(upoctave) == HIGH){
      note *= 2;
    }
    else {
      if (digitalRead(downoctave) == HIGH){
        note /= 2;
      }
    }
    tone(alarm, melody[i] * note);
    delay(tempo[i] * (analogRead(potent) /  30));
  }
  
 {% endhighlight %}