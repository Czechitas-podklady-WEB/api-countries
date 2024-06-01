import { HTTPException, Hono } from 'https://deno.land/x/hono/mod.ts';
import { cors } from "https://deno.land/x/hono@v4.3.11/middleware/cors/index.ts";
import countries from './countries.json' with {type: "json"};

const findByCode = (codeType) => {
    return (c) => {
        const code = c.req.param("code").toUpperCase();
        const country = countries.find(country => country[codeType] === code);
        if (country === null) {
            throw HTTPException(404);
        }
        return c.json(country);
    }
}

const app = new Hono()
app.use('/*', cors())
app.get('/v1/iso2/:code', findByCode("alpha2Code"));
app.get('/v1/iso3/:code', findByCode("alpha3Code"));

export default app;
