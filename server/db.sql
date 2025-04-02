--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    post_id integer NOT NULL,
    author character varying(255) NOT NULL,
    content text NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.comments OWNER TO tpl522_13;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO tpl522_13;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: tpl522_13
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    date date NOT NULL,
    content text NOT NULL,
    image character varying(255),
    sources text
);


ALTER TABLE public.posts OWNER TO tpl522_13;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_13
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO tpl522_13;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_13
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.comments (id, post_id, author, content, date) FROM stdin;
1	1	Adam Salamat	This lake is absolutely beautiful! I visited last summer and had a fantastic time.	2024-04-02
2	2	Alan Salamat	I’ve always wanted to visit Sulaiman-Too. The views must be amazing.	2024-04-02
3	3	Victoria Brunner	Fairy Tale Canyon looks incredible! I need to see these rock formations in person.	2024-04-02
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: tpl522_13
--

COPY public.posts (id, title, author, date, content, image, sources) FROM stdin;
1	Lake Issyk-Kul	Aya Asylbek	2024-04-02	Lake Issyk-Kul is one of the most famous places in Kyrgyzstan. It is a large saltwater lake surrounded by majestic mountains, often referred to as the "Pearl of Kyrgyzstan." Visitors can relax on its beaches, enjoy boat rides, and participate in various water sports.	\N	Source: Wikipedia - Lake Issyk-Kul https://en.wikipedia.org/wiki/Issyk-Kul
2	Sulaiman-Too Mountain	Aya Asylbek	2024-04-02	Sulaiman-Too Mountain is a sacred site located in the city of Osh, and it is a UNESCO World Heritage site. The mountain attracts tourists with its historical and cultural significance, as well as stunning views of the city and the surrounding area.	\N	Source: Wikipedia - Sulaiman-Too https://en.wikipedia.org/wiki/Sulaiman-Too
3	Fairy Tale Canyon (Kyzyl-Asu)	Aya Asylbek	2024-04-02	Fairy Tale Canyon, known as Kyzyl-Asu, is one of the most beautiful natural attractions in Kyrgyzstan. The canyon is famous for its vibrant, almost magical-looking rock formations that resemble characters from ancient myths.	\N	Source: Wikipedia - Fairy Tale Canyon https://en.wikipedia.org/wiki/Fairy_Tale_Canyon
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.comments_id_seq', 3, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_13
--

SELECT pg_catalog.setval('public.posts_id_seq', 3, true);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_13
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

