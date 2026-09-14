--
-- PostgreSQL database dump
--

\restrict dfBZReK8blvNixw9j94xd4s3LotQtGPlY8OhgB7MtPSNodanjnShMsTukKyvaUW

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-09-07 09:55:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4943 (class 1262 OID 16411)
-- Name: api; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE api WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United Kingdom.1252';


\unrestrict dfBZReK8blvNixw9j94xd4s3LotQtGPlY8OhgB7MtPSNodanjnShMsTukKyvaUW
\connect api
\restrict dfBZReK8blvNixw9j94xd4s3LotQtGPlY8OhgB7MtPSNodanjnShMsTukKyvaUW

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 24613)
-- Name: moddatetime; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS moddatetime WITH SCHEMA public;


--
-- TOC entry 226 (class 1259 OID 32801)
-- Name: list_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.list_items (
    item_id bigint NOT NULL,
    list_id bigint NOT NULL,
    item_name character varying(64),
    item_is_checked boolean DEFAULT false NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 32800)
-- Name: list_items_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.list_items ALTER COLUMN item_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.list_items_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 24592)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) with time zone NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 32783)
-- Name: todo_lists; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.todo_lists (
    list_id bigint NOT NULL,
    user_id bigint NOT NULL,
    list_name character varying(32) NOT NULL,
    list_category character varying(32),
    list_is_completed boolean DEFAULT false NOT NULL,
    list_created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    list_updated_at timestamp(0) with time zone
);


--
-- TOC entry 223 (class 1259 OID 32782)
-- Name: todo_lists_list_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.todo_lists ALTER COLUMN list_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.todo_lists_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16413)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(128) NOT NULL,
    password character varying(256) NOT NULL,
    created_at timestamp(0) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) with time zone,
    name character varying(32) NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16412)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 220
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 227 (class 1259 OID 32846)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4786 (class 2606 OID 32811)
-- Name: list_items list_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.list_items
    ADD CONSTRAINT list_items_pkey PRIMARY KEY (item_id);


--
-- TOC entry 4782 (class 2606 OID 24601)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4784 (class 2606 OID 32794)
-- Name: todo_lists todo_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo_lists
    ADD CONSTRAINT todo_lists_pkey PRIMARY KEY (list_id);


--
-- TOC entry 4777 (class 2606 OID 32867)
-- Name: users users_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email UNIQUE (email);


--
-- TOC entry 4779 (class 2606 OID 32834)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4780 (class 1259 OID 24628)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 4790 (class 2620 OID 32893)
-- Name: todo_lists set_updated; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_updated BEFORE UPDATE ON public.todo_lists FOR EACH ROW EXECUTE FUNCTION public.moddatetime('list_updated_at');


--
-- TOC entry 4789 (class 2620 OID 24615)
-- Name: users set_updated; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_updated BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.moddatetime('updated_at');


--
-- TOC entry 4788 (class 2606 OID 32894)
-- Name: list_items fk_todo_lists_to_list_items; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.list_items
    ADD CONSTRAINT fk_todo_lists_to_list_items FOREIGN KEY (list_id) REFERENCES public.todo_lists(list_id) ON DELETE CASCADE;


--
-- TOC entry 4787 (class 2606 OID 32836)
-- Name: todo_lists fk_users_to_todo_lists; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.todo_lists
    ADD CONSTRAINT fk_users_to_todo_lists FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2026-09-07 09:55:36

--
-- PostgreSQL database dump complete
--

\unrestrict dfBZReK8blvNixw9j94xd4s3LotQtGPlY8OhgB7MtPSNodanjnShMsTukKyvaUW

