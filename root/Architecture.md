# Architecture

## Clean Architecture

Proposed by Robert C. Martin (Uncle Bob), organizes code into concentric layers, focusing on framework independence and placing business rules at the core.

### Basic Structure

- **Entities**: Core business rules
- **Use Cases**: Application logic
- **Controllers**: Interface with the external world
- **Infrastructure**: Technical details (database, UI, etc.)

### Code Example

```java
// Entity (Innermost Layer)
public class User {
    private String id;
    private String name;

    public User(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() { return id; }
    public String getName() { return name; }
}

// Repository Interface (Independent of implementation)
public interface UserRepository {
    void save(User user);
    User findById(String id);
}

// Use Case (Application business rules)
public class CreateUserUseCase {
    private UserRepository repository;

    public CreateUserUseCase(UserRepository repository) {
        this.repository = repository;
    }

    public User execute(String name) {
        User user = new User(generateId(), name);
        repository.save(user);
        return user;
    }

    private String generateId() {
        return java.util.UUID.randomUUID().toString();
    }
}

// Repository Implementation (Infrastructure)
public class InMemoryUserRepository implements UserRepository {
    private Map<String, User> users = new HashMap<>();

    @Override
    public void save(User user) {
        users.put(user.getId(), user);
    }

    @Override
    public User findById(String id) {
        return users.get(id);
    }
}

// Controller (Outer Layer)
public class UserController {
    private CreateUserUseCase createUserUseCase;

    public UserController(CreateUserUseCase createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    public User createUser(String name) {
        return createUserUseCase.execute(name);
    }
}

// Usage Example
public class Main {
    public static void main(String[] args) {
        UserRepository repository = new InMemoryUserRepository();
        CreateUserUseCase useCase = new CreateUserUseCase(repository);
        UserController controller = new UserController(useCase);

        User user = controller.createUser("John");
        System.out.println("User created: " + user.getName() + " (ID: " + user.getId() + ")");
    }
}
```

### Explanation

- The `User` entity is independent and holds only essential data.
- The `CreateUserUseCase` defines the logic for creating users and depends on an interface (`UserRepository`), not a specific implementation.
- The `InMemoryUserRepository` implementation resides in the infrastructure layer and can be swapped (e.g., for a real database).
- The `UserController` acts as an external entry point.

---

## Hexagonal Architecture (Ports and Adapters)

Focuses on isolating the business logic (the "hexagon") from external details through ports (interfaces) and adapters (implementations).

### Basic Structure

- **Domain**: Core business logic
- **Ports**: Interfaces defining inputs and outputs
- **Adapters**: Implementations connecting the domain to the outside world

### Code Example

```java
// Domain (Center of the hexagon)
public class Order {
    private String id;
    private String product;
    private int quantity;

    public Order(String id, String product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    public String getId() { return id; }
    public String getProduct() { return product; }
    public int getQuantity() { return quantity; }
}

// Output Port (Interface for the repository)
public interface OrderRepositoryPort {
    void save(Order order);
    Order findById(String id);
}

// Domain Service (Business logic)
public class OrderService {
    private OrderRepositoryPort repository;

    public OrderService(OrderRepositoryPort repository) {
        this.repository = repository;
    }

    public Order createOrder(String product, int quantity) {
        Order order = new Order(generateId(), product, quantity);
        repository.save(order);
        return order;
    }

    private String generateId() {
        return java.util.UUID.randomUUID().toString();
    }
}

// Output Adapter (Repository implementation)
public class InMemoryOrderRepository implements OrderRepositoryPort {
    private Map<String, Order> orders = new HashMap<>();

    @Override
    public void save(Order order) {
        orders.put(order.getId(), order);
    }

    @Override
    public Order findById(String id) {
        return orders.get(id);
    }
}

// Input Port (Interface for the outside world)
public interface OrderControllerPort {
    Order createOrder(String product, int quantity);
}

// Input Adapter (e.g., REST controller)
public class OrderRestAdapter implements OrderControllerPort {
    private OrderService orderService;

    public OrderRestAdapter(OrderService orderService) {
        this.orderService = orderService;
    }

    @Override
    public Order createOrder(String product, int quantity) {
        return orderService.createOrder(product, quantity);
    }
}

// Usage Example
public class Main {
    public static void main(String[] args) {
        OrderRepositoryPort repository = new InMemoryOrderRepository();
        OrderService service = new OrderService(repository);
        OrderControllerPort controller = new OrderRestAdapter(service);

        Order order = controller.createOrder("Notebook", 2);
        System.out.println("Order created: " + order.getProduct() + " (Qty: " + order.getQuantity() + ")");
    }
}
```

### Explanation
- The domain (`Order` and `OrderService`) is the core and depends on nothing external.
- Ports (`OrderRepositoryPort` and `OrderControllerPort`) define contracts for input and output.
- Adapters (`InMemoryOrderRepository` and `OrderRestAdapter`) connect the domain to the outside world (e.g., database, REST API).
- The business logic remains isolated and can easily connect to different adapters.

---

## Key Differences

- **Clean Architecture**: Organizes code into concentric layers with dependencies pointing inward.
- **Hexagonal Architecture**: Focuses on ports and adapters, isolating the domain from any external technology.

| **Aspect**               | **Clean Architecture**                          | **Hexagonal Architecture**                     |
|---------------------------|------------------------------------------------|------------------------------------------------|
| **Structure**            | Concentric layers (Entities → Use Cases → Controllers → Infrastructure). | Ports and Adapters pattern (Domain at the center, surrounded by Ports and Adapters). |
| **Focus**                | Emphasizes layers and dependency rules (inner layers don’t know about outer ones). | Emphasizes symmetry between inputs and outputs (ports define *what*, adapters define *how*). |
| **Terminology**          | Uses "Entities," "Use Cases," and "Controllers." | Uses "Ports" (interfaces) and "Adapters" (implementations). |
| **Philosophy**           | Prioritizes business rules as the core, with a strict hierarchy of layers. | Prioritizes isolating the domain from *all* external systems, treating inputs and outputs equally. |
| **Flexibility**          | More prescriptive about layer organization.    | More flexible—focuses on adapters plugging into ports, regardless of layer structure. |