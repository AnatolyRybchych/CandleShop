USE [Candle];

CREATE USER [tolik] FOR LOGIN [tolik];
ALTER USER [tolik] WITH DEFAULT_SCHEMA=[dbo];
ALTER ROLE [db_owner] ADD MEMBER [tolik];