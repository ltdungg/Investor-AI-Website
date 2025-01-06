CREATE SCHEMA stock;

CREATE TYPE exchange_dt AS ENUM ('HOSE', 'HNX', 'UPCOM');

CREATE TABLE stock.industries (
    "icb_id" INT PRIMARY KEY,
    "icb_name" TEXT,
    "en_icb_name" TEXT,
    "level" INT
);

CREATE TABLE stock.stock_information (
    "symbol" TEXT PRIMARY KEY,
    "company_name" TEXT,
    "description" TEXT,
    "icb1" INT REFERENCES stock.industries(icb_id),
    "icb2" INT REFERENCES stock.industries(icb_id),
    "icb3" INT REFERENCES stock.industries(icb_id),
    "icb4" INT REFERENCES stock.industries(icb_id),
    "exchange" exchange_dt,
    "history_dev" TEXT,
    "company_promise" TEXT,
    "business_risk" TEXT,
    "key_developments" TEXT,
    "business_strategies" TEXT

);

CREATE TABLE stock.stock_price (
    "symbol" TEXT NOT NULL,
    "exchange" exchange_dt,
    "trading_date" DATE NOT NULL,
    "open" REAL,
    "high" REAL,
    "low" REAL,
    "close" REAL,
    "volume" REAL,
    "value" REAL,
    PRIMARY KEY ("symbol", "trading_date")
);

