# SQL

## Concat Rows

```sql
DECLARE @Users TABLE (Id INT, [Name] VARCHAR(MAX))

INSERT INTO @Users VALUES (1, 'Name 1')
INSERT INTO @Users VALUES (2, 'Name 2')
INSERT INTO @Users VALUES (3, 'Name 3')
INSERT INTO @Users VALUES (4, 'Name 4')
INSERT INTO @Users VALUES (5, 'Name 5')

SELECT STUFF((SELECT ', ' + [Name]
FROM @Users
GROUP BY [Name]
ORDER BY [Name]
FOR XML PATH('')), 1, 1, '') AS Users
```

## Cross Join

```sql
DECLARE @Users TABLE (Id INT, [Name] VARCHAR(MAX))

INSERT INTO @Users VALUES (1, 'Name 1')
INSERT INTO @Users VALUES (2, 'Name 2')
INSERT INTO @Users VALUES (3, 'Name 3')
INSERT INTO @Users VALUES (4, 'Name 4')
INSERT INTO @Users VALUES (5, 'Name 5')

DECLARE @Colors TABLE (Id INT, [Name] VARCHAR(MAX))

INSERT INTO @Colors VALUES (1, 'Red')
INSERT INTO @Colors VALUES (2, 'Green')
INSERT INTO @Colors VALUES (3, 'Blue')

SELECT * FROM @Users AS U CROSS JOIN @Colors AS C ORDER BY U.Name
```

## Migration

```sql
-- TABLE
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'SCHEMA' AND TABLE_NAME = 'TABLE')
BEGIN
    PRINT 'EXISTS!'
END

-- VIEW
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.VIEWS WHERE TABLE_SCHEMA = 'SCHEMA' AND TABLE_NAME = 'VIEW')
BEGIN
    PRINT 'EXISTS!'
END

-- COLUMN
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'SCHEMA' AND TABLE_NAME = 'TABLE' AND COLUMN_NAME = 'COLUMN')
BEGIN
    PRINT 'EXISTS!'
END

-- CONSTRAINT (PK and FK)
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA = 'SCHEMA' AND TABLE_NAME = 'TABLE' AND CONSTRAINT_NAME = 'CONSTRAINT')
BEGIN
    PRINT 'EXISTS!'
END

-- INDEX
IF EXISTS (SELECT 1 FROM SYS.INDEXES WHERE OBJECT_ID = OBJECT_ID('SCHEMA.TABLE') AND NAME='INDEX')
BEGIN
	PRINT 'EXISTS!'
END

-- DEFAULT
IF OBJECT_ID('DEFAULT', 'D') IS NOT NULL
BEGIN
    PRINT 'EXISTS!'
END

-- PROCEDURE
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_SCHEMA = 'SCHEMA' AND ROUTINE_NAME = 'PROCEDURE')
BEGIN
    PRINT 'EXISTS!'
END

-- FUNCTION
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_TYPE = 'FUNCTION' AND ROUTINE_SCHEMA = 'SCHEMA' AND ROUTINE_NAME = 'FUNCTION')
BEGIN
    PRINT 'EXISTS!'
END
```

## Order Paging 2012

```sql
DECLARE @Table TABLE (Id INT, [Name] VARCHAR(250));

INSERT INTO @Table VALUES (1, 'Name 01');
INSERT INTO @Table VALUES (2, 'Name 02');
INSERT INTO @Table VALUES (3, 'Name 03');
INSERT INTO @Table VALUES (4, 'Name 04');
INSERT INTO @Table VALUES (5, 'Name 05');
INSERT INTO @Table VALUES (6, 'Name 06');
INSERT INTO @Table VALUES (7, 'Name 07');
INSERT INTO @Table VALUES (8, 'Name 08');
INSERT INTO @Table VALUES (9, 'Name 09');

DECLARE @OrderProperty VARCHAR(100) = 'Id';
DECLARE @OrderAscending BIT = 1;
DECLARE @PageIndex INT = 1;
DECLARE @PageSize INT = 2;
DECLARE @SkipRows INT = (@PageIndex-1) * @PageSize;

;WITH Filtered AS (SELECT Id, Name FROM @Table)

SELECT Filtered.*, Total.* FROM Filtered
CROSS JOIN (SELECT COUNT(*) AS Total FROM Filtered) AS Total
ORDER BY
    CASE WHEN @OrderAscending IS NULL OR @OrderProperty IS NULL THEN Id END ASC,
    CASE WHEN @OrderAscending = 1 AND @OrderProperty = 'Id' THEN Id END ASC,
    CASE WHEN @OrderAscending = 0 AND @OrderProperty = 'Id' THEN Id END DESC,
    CASE WHEN @OrderAscending = 1 AND @OrderProperty = 'Name' THEN [Name] END ASC,
    CASE WHEN @OrderAscending = 0 AND @OrderProperty = 'Name' THEN [Name] END DESC
OFFSET @SkipRows ROWS FETCH NEXT @PageSize ROWS ONLY;
```

## Order Paging 2016

```sql
DECLARE @Table TABLE (Id INT, [Name] VARCHAR(250));

INSERT INTO @Table VALUES (1, 'Name 01');
INSERT INTO @Table VALUES (2, 'Name 02');
INSERT INTO @Table VALUES (3, 'Name 03');
INSERT INTO @Table VALUES (4, 'Name 04');
INSERT INTO @Table VALUES (5, 'Name 05');
INSERT INTO @Table VALUES (6, 'Name 06');
INSERT INTO @Table VALUES (7, 'Name 07');
INSERT INTO @Table VALUES (8, 'Name 08');
INSERT INTO @Table VALUES (9, 'Name 09');

DECLARE @PageIndex INT = 1;
DECLARE @PageSize INT = 2;
DECLARE @OrderProperty VARCHAR(100) = 'Id';
DECLARE @OrderAsc BIT = 1;
DECLARE @InitialPage INT = (@PageIndex	* @PageSize) - 1;
DECLARE @FinalPage INT = (@InitialPage	+ @PageSize) - 1;

;WITH FilteredOrdered AS
(
    SELECT *,
        COUNT(*) OVER () AS Total,
        ROW_NUMBER() OVER (ORDER BY
            CASE WHEN @OrderAsc	IS NULL	OR @OrderProperty IS NULL THEN Id END ASC,
            CASE WHEN @OrderAsc	= 1 AND @OrderProperty = 'Id' THEN Id END ASC,
            CASE WHEN @OrderAsc	= 0 AND @OrderProperty = 'Id' THEN Id END DESC,
            CASE WHEN @OrderAsc	= 1 AND @OrderProperty = 'Name' THEN [Name] END ASC,
            CASE WHEN @OrderAsc	= 0 AND @OrderProperty = 'Name' THEN [Name] END DESC
        ) AS Line
    FROM @Table
)

SELECT * FROM FilteredOrdered WHERE @PageSize IS NULL OR (Line BETWEEN @InitialPage AND @FinalPage);
```

## Pivot

```sql
DROP TABLE IF EXISTS #Table

CREATE TABLE #Table ([Year] INT, Product VARCHAR(MAX), Quantity INT)

INSERT INTO #Table VALUES (2019, 'Product 1', 25)
INSERT INTO #Table VALUES (2019, 'Product 2', 15)
INSERT INTO #Table VALUES (2019, 'Product 3', 45)
INSERT INTO #Table VALUES (2020, 'Product 1', 50)
INSERT INTO #Table VALUES (2020, 'Product 2', 45)

SELECT * FROM #Table

DECLARE @Columns VARCHAR(MAX) = STUFF((SELECT ', ' + QUOTENAME(Product) FROM #Table GROUP BY Product FOR XML PATH('')), 1, 1, '')

EXECUTE('SELECT [Year],' + @Columns + ' FROM #Table PIVOT (SUM(Quantity) FOR Product IN (' + @Columns + ')) AS P ORDER BY 1;')

DROP TABLE IF EXISTS #Table
```

## Recursive

```sql
DECLARE @Table TABLE (Id INT, IdParent INT);

INSERT INTO @Table VALUES (1, NULL);
INSERT INTO @Table VALUES (2, 1);
INSERT INTO @Table VALUES (3, 1);
INSERT INTO @Table VALUES (4, 2);
INSERT INTO @Table VALUES (5, 3);
INSERT INTO @Table VALUES (6, 3);
INSERT INTO @Table VALUES (7, 3);
INSERT INTO @Table VALUES (8, 4);
INSERT INTO @Table VALUES (9, 5);

;WITH CTE AS
(
    SELECT
        T.Id,
        T.IdParent,
        1 AS [Level]
    FROM @Table AS T
    WHERE T.IdParent IS NULL
    
    UNION ALL
    
    SELECT
        T.Id,
        T.IdParent,
        CTE.[Level] + 1 AS [Level]
    FROM @Table AS T
    JOIN CTE ON CTE.Id = T.IdParent
)

SELECT * FROM CTE ORDER BY [Level]
```

## While

```sql
DECLARE @Table TABLE (Id INT, [Name] VARCHAR(MAX), [Line] INT)

INSERT INTO @Table VALUES (1, 'Name 1', NULL)
INSERT INTO @Table VALUES (2, 'Name 2', NULL)
INSERT INTO @Table VALUES (3, 'Name 3', NULL)
INSERT INTO @Table VALUES (4, 'Name 4', NULL)
INSERT INTO @Table VALUES (5, 'Name 5', NULL)

DECLARE	@Line INT = 0;
DECLARE @CurrentLine INT = NULL;
DECLARE @FinalLine INT = NULL;

UPDATE @Table SET @Line = [Line] = @Line + 1;

SELECT @CurrentLine = MIN([Line]) FROM @Table

WHILE @CurrentLine IS NOT NULL
BEGIN
    SET @FinalLine = @CurrentLine;

    --START
    PRINT @CurrentLine
    --END

    SELECT @CurrentLine = MIN([Line]) FROM @Table WHERE [Line] > @FinalLine
END
```

## XML

```sql
DECLARE @Table TABLE (Id INT, [Name] VARCHAR(MAX))

INSERT INTO @Table VALUES (1, 'Name 1')
INSERT INTO @Table VALUES (2, 'Name 2')
INSERT INTO @Table VALUES (3, 'Name 3')
INSERT INTO @Table VALUES (4, 'Name 4')
INSERT INTO @Table VALUES (5, 'Name 5')

DECLARE @Xml XML = (SELECT * FROM @Table AS TableXml FOR XML AUTO, ELEMENTS)

SELECT
    TableXml.Columns.value('Id[1]', 'INT') AS Id,
    TableXml.Columns.value('Name[1]', 'VARCHAR(MAX)') AS [Name]
FROM @Xml.nodes('TableXml') AS TableXml(Columns)
```
