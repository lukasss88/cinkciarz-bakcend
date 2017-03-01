CREATE SEQUENCE wallet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


CREATE TABLE wallet (
  id BIGINT DEFAULT nextval('wallet_id_seq'::regclass) NOT NULL PRIMARY KEY,
  currency_name VARCHAR(60) NOT NULL,
  currency_value FLOAT
);

-- PRIMARY KEYS


-- FOREIGN KEYS


