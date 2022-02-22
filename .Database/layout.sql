CREATE DATABASE [Candle];
CREATE LOGIN [tolik] WITH PASSWORD = [Tolik7zzz];
ALTER SERVER ROLE [sysadmin] ADD MEMBER [tolik];

USE [Candle];
CREATE USER [tolik] FOR LOGIN [tolik];
ALTER USER [tolik] WITH DEFAULT_SCHEMA=[dbo];
ALTER ROLE [db_owner] ADD MEMBER [tolik];
