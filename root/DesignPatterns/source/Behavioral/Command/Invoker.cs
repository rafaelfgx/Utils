public sealed record Invoker
{
    private Command Command;

    public void SetCommand(Command command) => Command = command;

    public void Execute() => Command?.Execute();
}
