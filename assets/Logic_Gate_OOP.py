class LogicGate:

    def __init__(self,n):
        self.name = n
        self.output = None

    def getLabel(self):
        return self.name

    def getOutput(self):
        self.output = self.performGateLogic()
        return self.output


class BinaryGate(LogicGate):

    def __init__(self,n):
        LogicGate.__init__(self,n)

        self.pinA = None
        self.pinB = None
        self.pinC = None
        self.expin = False

    def getPinA(self):
        if self.pinA == None:
            return int(input("Enter Pin A input for gate "+self.getLabel()+"-->"))
        else:
            return self.pinA.getFrom().getOutput()

    def getPinB(self):
        if self.pinB == None:
            return int(input("Enter Pin B input for gate "+self.getLabel()+"-->"))
        else:
            return self.pinB.getFrom().getOutput()
    def getPinC(self):
        if self.pinC == None:
            return int(input("Enter Pin C input for gate "+self.getLabel()+"-->"))
        else:
            return self.pinC.getFrom().getOutput()

    def setNextPin(self,source):
        if self.pinA == None:
            self.pinA = source
        elif self.pinB == None:
            self.pinB = source
        elif self.expin == True:
            if self.pinC == None:
                self.pinC = source
        else:
            print("Cannot Connect: NO EMPTY PINS on this gate")


class AndGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):

        a = self.getPinA()
        b = self.getPinB()
        if a==1 and b==1:
            return 1
        else:
            return 0

class OrGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):

        a = self.getPinA()
        b = self.getPinB()
        if a ==1 or b==1:
            return 1
        else:
            return 0

class NandGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if self.expin == True:
            c = self.getPinC()
            if a==1 and b==1 and c==1:
                return 0
            else:
                return 1
        else:
            if a==1 and b==1:
                return 0
            else:
                return 1

class NorGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if a==1 or b==1:
            return 0
        else:
            return 1

class ExorGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):

        a = self.getPinA()
        b = self.getPinB()
        if (a==1 or b==1) and not(a==1 and b==1):
            return 1
        else:
            return 0

class ExnorGate(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)

    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if (a==1 or b==1) and not(a==1 and b==1):
            return 0
        else:
            return 1

class JKFlipFlop(BinaryGate):

    def __init__(self,n):
        BinaryGate.__init__(self,n)
        self.q = 0
        self.next = None
        self.visited = False

    def performGateLogic(self):
        q = self.q
        if not self.visited:
            self.visited = True
            j = self.getPinA()
            k = self.getPinB()
            if (j==1 and self.q==0) or (self.q==1 and k==0):
                self.next = 1
            else:
                self.next = 0
        return q


class UnaryGate(LogicGate):

    def __init__(self,n):
        LogicGate.__init__(self,n)

        self.pin = None

    def getPin(self):
        if self.pin == None:
            return int(input("Enter Pin input for gate "+self.getLabel()+"-->"))
        else:
            return self.pin.getFrom().getOutput()

    def setNextPin(self,source):
        if self.pin == None:
            self.pin = source
        else:
            print("Cannot Connect: NO EMPTY PINS on this gate")


class NotGate(UnaryGate):

    def __init__(self,n):
        UnaryGate.__init__(self,n)

    def performGateLogic(self):
        if self.getPin():
            return 0
        else:
            return 1
class Switch(UnaryGate):

    def __init__(self,n):
        UnaryGate.__init__(self,n)
        self.switch = None

    def performGateLogic(self):
        if self.switch in range(0, 2):
            return(self.switch)
        else:
            return(self.getPin())

class Power(UnaryGate):

    def __init__(self,n):
        UnaryGate.__init__(self,n)

    def performGateLogic(self):
        return 1

class Connector:

    def __init__(self, fgate, tgate):
        self.fromgate = fgate
        self.togate = tgate

        tgate.setNextPin(self)

    def getFrom(self):
        return self.fromgate

    def getTo(self):
        return self.togate



def main():
    switch = Switch("Switch")
    power = Power("Power")
    j1 = AndGate("J1")
    j2 = AndGate("J2")
    n1 = NotGate("N1")
    jk1 = JKFlipFlop("JK1")
    jk2 = JKFlipFlop("JK2")
    notjk1 = NotGate("NotJK1")
    y = AndGate("Y")
    
    Connector(switch, j1)
    Connector(switch, j2)
    Connector(switch, n1)
    Connector(j1, jk1)
    Connector(n1, jk1)
    Connector(j2, jk2)
    Connector(power, jk2)
    Connector(jk1, notjk1)
    Connector(notjk1, j2)
    Connector(jk2, j1)
    Connector(notjk1, y)
    Connector(jk2, y)
    while True:
        button_press = int(input("Button Pressed? "))
        if button_press == 1:
            switch.switch = 1
        else:
            switch.switch = 0
        print(y.getOutput())
        jk1.visited = False
        jk1.q = jk1.next
        jk2.visited = False
        jk2.q = jk2.next
    
main()

