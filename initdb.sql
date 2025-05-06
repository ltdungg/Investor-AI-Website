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
);

CREATE TABLE stock.favourite_stock_list (
    "list_id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mode" favourite_stock_list_mode_dt NOT NULL,
    "author" INT REFERENCES stock.user("user_id"),
    "created_at" DATE NOT NULL, 
    "updated_at" DATE,
    "symbols" TEXT[]
);

CREATE TABLE stock.finance_ratio (
    "symbol" TEXT NOT NULL,
    "quarter" INT NOT NULL,
    "year" INT NOT NULL,
    "price_to_earning" REAL,
    "price_to_book" REAL,
    "value_before_ebitda" REAL,
    "roe" REAL,
    "roa" REAL,
    "days_receivable" INT,
    "days_inventory" INT,
    "days_payable" INT,
    "ebit_on_interest" REAL,
    "earning_per_share" INT,
    "book_value_per_share" INT,
    "equity_on_total_asset" REAL,
    "equity_on_liability" REAL,
    "current_payment" REAL,
    "quick_payment" REAL,
    "eps_change" REAL,
    "ebitda_on_stock" REAL,
    "gross_profit_margin" REAL,
    "operating_profit_margin" REAL,
    "post_tax_margin" REAL,
    "debt_on_equity" REAL,
    "debt_on_asset" REAL,
    "debt_on_ebitda" REAL,
    "short_on_long_debt" REAL,
    "asset_on_equity" REAL,
    "capital_balance" INT,
    "cash_on_equity" REAL,
    "cash_on_capitalize" REAL,
    "cash_circulation" INT,
    "revenue_on_work_capital" REAL,
    "capex_on_fixed_asset" REAL,
    "revenue_on_asset" REAL,
    "post_tax_on_pre_tax" REAL,
    "ebit_on_revenue" REAL,
    "pre_tax_on_ebit" REAL,
    "payable_on_equity" REAL,
    "ebitda_on_stock_change" REAL,
    "book_value_per_share_change" REAL,
    "interest_margin" REAL,
	"non_interest_on_toi" REAL,
	"bad_debt_percentage" REAL,
	"provision_on_bad_debt" REAL,
	"cost_of_financing" REAL,
	"equity_on_loan" REAL,
	"cost_to_income" REAL,
	"pre_provision_on_toi" REAL,
	"post_tax_on_toi" REAL,
	"loan_on_earn_asset" REAL,
	"loan_on_asset" REAL,
	"loan_on_deposit" REAL,
	"deposit_on_earn_asset" REAL,
	"bad_debt_on_asset" REAL,
	"liquidity_on_liability" REAL,
	"cancel_debt" REAL,
	"credit_growth" REAL,
    PRIMARY KEY ("symbol", "quarter", "year")
);

CREATE TABLE stock.finance_balance_sheet (
    "symbol" TEXT NOT NULL,
    "quarter" INT NOT NULL,
    "year" INT NOT NULL,
    "short_asset" INT,
    "cash" INT,
    "short_invest" INT,
    "short_receivable" INT,
    "inventory" INT,
    "long_asset" INT,
    "fixed_asset" INT,
    "asset" INT,
    "debt" INT,
    "short_debt" INT,
    "long_debt" INT,
    "equity" INT,
    "capital" INT,
    "other_debt" INT,
    "un_distributed_income" REAL,
    "minor_share_holder_profit" INT,
    "payable" INT,
	"central_bank_deposit" REAL,
	"other_bank_deposit" REAL,
	"other_bank_loan" REAL,
	"stock_invest" REAL,
	"customer_loan" REAL,
	"bad_loan" REAL,
	"provision" REAL,
	"net_customer_loan" REAL,
	"other_asset" REAL,
	"other_bank_credit" REAL,
	"owe_other_bank" REAL,
	"owe_central_bank" REAL,
	"valuable_paper" REAL,
	"payable_interest" REAL,
	"receivable_interest" REAL,
	"deposit" REAL,
	"fund" REAL,
    PRIMARY KEY ("symbol", "quarter", "year")
);

CREATE TABLE stock.finance_cash_flow (
    "symbol" TEXT NOT NULL,
    "quarter" INT NOT NULL,
    "year" INT NOT NULL,
    "invest_cost" INT,
    "from_invest" INT,
    "from_financial" INT,
    "from_sale" INT,
    "free_cash_flow" REAL,
    PRIMARY KEY ("symbol", "quarter", "year")
);

CREATE TABLE stock.finance_income_statement (
    "symbol" TEXT NOT NULL,
    "quarter" INT NOT NULL,
    "year" INT NOT NULL,
    "revenue" INT,
    "year_revenue_growth" REAL,
    "quarter_revenue_growth" REAL,
    "cost_of_good_sold" INT,
    "gross_profit" INT,
    "operation_expense" INT,
    "operation_profit" INT,
    "year_operation_profit_growth" REAL,
    "quarter_operation_profit_growth" REAL,
    "interest_expense" INT,
    "pre_tax_profit" INT,
    "post_tax_profit" INT,
    "share_holder_income" INT,
    "year_share_holder_income_growth" REAL,
    "quarter_share_holder_income_growth" REAL,
    "ebitda" REAL,
	"invest_profit" REAL,
	"service_profit" REAL,
	"other_profit" REAL,
	"provision_expense" REAL,
	"operation_income" REAL,
    PRIMARY KEY ("symbol", "quarter", "year")
);

CREATE TABLE stock.predicted_stock (
    "symbol" TEXT,
    "date" DATE NOT NULL,
    "price" FLOAT NOT NULL,
    PRIMARY KEY ("symbol", "date")
);

CREATE TABLE stock.analysis_report (
    "id" INT,
    "symbol" TEXT,
    "source" TEXT,
    "report_year" INT,
    "name" TEXT,
    "published_at" DATE,
    "body_url" TEXT,
    PRIMARY KEY ("id")
);

CREATE TABLE stock.news (
    "id" INT,
    "title" TEXT,
    "date" TIMESTAMP,
    "redirect_url" TEXT,
    "thumb" TEXT,
    "publisher" TEXT,
    "description" TEXT,
    PRIMARY KEY ("id")
);