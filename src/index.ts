import readline from "node:readline";
import { resolve } from "node:path";

const run = (code: string) => {
    console.log(code);
};

const runFile = async (path: string) => {
    const content = await Bun.file(resolve(process.cwd(), path)).text();
    run(content);
};

const runPrompt = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.prompt();

    rl.on("line", (line) => {
        run(line);
        rl.prompt();
    });

    rl.on("close", () => {
        console.log("\nCrox!");
        process.exit(0);
    });
};

const main = () => {
    const args = process.argv.slice(2);

    if (args.length > 1) {
        throw new Error("Too many arguments");
    }

    if (args.length === 1) {
        runFile(args[0]);
    } else if (args.length === 0) {
        runPrompt();
    }
};

main();
