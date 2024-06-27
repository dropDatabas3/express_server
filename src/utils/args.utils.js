import { Command } from 'commander';

const args = new Command();

args.option(" -p <port>", "port", 8000)
args.option(" --env <env>", "enviroment", "dev")
args.option(" --persistence <pers>", "persistence", "mongo")


args.parse();   

export default args.opts()