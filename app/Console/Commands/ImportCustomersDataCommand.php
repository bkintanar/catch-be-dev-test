<?php

namespace App\Console\Commands;

use App\Models\Customer;
use Illuminate\Console\Command;

class ImportCustomersDataCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-customers-data {file=customers.csv}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports customers data from CSV file. Reads files from the ./data directory.';

    protected array $headers = [];

    private string $filepath = '';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->setFilepath();

        if (! $this->filepath) {
            return self::FAILURE;
        }

        $fileContents = file($this->filepath);

        $customersImportedCount = $customerAlreadyExistsCount = 0;
        foreach ($fileContents as $key => $line) {
            $data = str_getcsv($line);

            if ($key === 0) {
                $this->headers = $data;

                continue;
            }

            $formattedData = $this->formatData($data);

            if ($formattedData) {
                if (Customer::where('email', $formattedData['email'])->exists()) {
                    $customerAlreadyExistsCount++;

                    continue;
                }

                Customer::create($formattedData);

                $customersImportedCount++;
            }
        }

        $this->info("Imported {$customersImportedCount} records.");

        if ($customerAlreadyExistsCount) {
            $this->warn("Skipped {$customerAlreadyExistsCount} duplicate (email) records.");
        }
    }

    /**
     * @param array $data
     * @return array
     */
    private function formatData(array $data): array
    {
        $formattedData = [];
        foreach ($data as $key => $row) {
            $formattedData[$this->headers[$key]] = $row;
        }

        return $formattedData;
    }

    /**
     * @return void
     */
    private function setFilepath(): void
    {
        $filepath = base_path('data/' . $this->argument('file'));

        if (! file_exists($filepath)) {
            $this->error("File $filepath doesn't exist");

            return;
        }

        $this->info("Importing customers data from $filepath");

        $this->filepath = $filepath;
    }
}
