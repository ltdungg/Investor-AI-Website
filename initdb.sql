CREATE SCHEMA stock;

CREATE TYPE exchange_dt AS ENUM ('HOSE', 'HNX', 'UPCOM');
CREATE TYPE user_role_dt AS ENUM ('member', 'admin');
CREATE TYPE favourite_stock_list_mode_dt AS ENUM ('private', 'public');

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

CREATE TABLE stock.user (
    "user_id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" user_role_dt NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE
)

CREATE TABLE stock.favourite_stock_list (
    "list_id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mode" favourite_stock_list_mode_dt NOT NULL,
    "author" INT REFERENCES stock.user("user_id"),
    "created_at" DATE NOT NULL, 
    "updated_at" DATE,
    "symbols" TEXT[]
)

-- CREATE TABLE stock.finance_ratio (
--     "symbol" TEXT NOT NULL,
--     "quarter" INT NOT NULL,
--     "year" INT NOT NULL,

-- )