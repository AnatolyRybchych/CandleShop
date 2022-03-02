USE [Candle]

CREATE TABLE LayoutHeader(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Region VARCHAR(50),
    Short VARCHAR(4),

    Home NVARCHAR(15),
    About NVARCHAR(15),
    Shop NVARCHAR(15),

    UNIQUE(Short),
    UNIQUE(Region),
);

INSERT INTO LayoutHeader (Region, Short, Home, About, Shop) VALUES(
    'Ukraine', 'UA', N'Головна', N'Про нас', N'Придбати'
);

