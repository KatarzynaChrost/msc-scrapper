## Project description

This is an project that helps to acquire data from MSC shipment search engine https://www.msc.com/en/track-a-shipment,
it allows to check ETA in more than 1 shipment at a time

## Requirements

You will need to have Node.js installed on your machine, with at least version 14.x.

## Getting Started

First, you need to have a CSV file with the shipment data for which you need to check the ETA. You should name this file inputFile.csv and place it in the repository folder. There is already an example in this repo.

Then, you will need to install project dependencies:

```bash
npm install
```

Then, run the program:

```bash
npm run start
```

After your program has finished, you will find finished outputFile.csv with the data you need in repository folder.