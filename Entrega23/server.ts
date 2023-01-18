import {serve} from "https://deno.land/std@0.100.0/http/mod.ts";

const s = serve({port: 8080});
for await (const req of s) {
    req.respond({body: "Hello desde deno"})
} 