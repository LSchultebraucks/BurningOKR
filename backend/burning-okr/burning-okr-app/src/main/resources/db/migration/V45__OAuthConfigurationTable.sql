CREATE TABLE public.oauth_configuration
(
   key character varying(255) NOT NULL,
   value character varying(255),
   type character varying(255),
   CONSTRAINT pk_oauth_configuration PRIMARY KEY (key)
)

INSERT INTO public.oauth_configuration (key, value, type) VALUES ('client-id', 'clientapp', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('client-secret', '', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('scope', 'USER', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('redirect-uri', '', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('silent-refresh-redirect-uri', '', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('auth-type', 'local', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('issuer', '', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('response-type', 'password,refresh_token', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('oidc', null, 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('show-debug-information', null, 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('require-https', 'false', 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('strict-discovery-document-validation', null, 'text');
INSERT INTO public.oauth_configuration (key, value, type) VALUES ('use-http-basic-auth', true, 'text');
