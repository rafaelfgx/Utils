var receiver = new Receiver();

var command = new ConcreteCommand(receiver);

var invoker = new Invoker();

invoker.SetCommand(command);

invoker.Execute();

Console.ReadKey();
