public sealed record ConcreteCommand(Receiver Receiver) : Command(Receiver)
{
    public override void Execute() => Receiver.Action();
}
