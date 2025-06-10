public abstract record Command(Receiver Receiver)
{
    public abstract void Execute();
}
