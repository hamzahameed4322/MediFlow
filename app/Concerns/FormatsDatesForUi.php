<?php

namespace App\Concerns;

use DateTimeInterface;

trait FormatsDatesForUi
{
    /**
     * Format serialized dates for UI consumption.
     */
    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format('Y-m-d');
    }
}
