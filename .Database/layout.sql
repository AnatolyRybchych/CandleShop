USE [Candle]

CREATE TABLE LayoutHeader(
    Id INT PRIMARY KEY IDENTITY(1,1),

    Home NVARCHAR(15),
    About NVARCHAR(15),
    Shop NVARCHAR(15),
);

INSERT INTO LayoutHeader (Home, About, Shop) 
VALUES(
    N'Головна', N'Про нас', N'Придбати'
);



