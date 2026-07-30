<?php

use Inertia\Testing\AssertableInertia as Assert;

test('returns a successful response and renders welcome page with stats', function () {
    $response = $this->get(route('home'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('welcome')
            ->has('featuredDoctors')
            ->has('featuredReviews')
            ->has('stats.appointments')
            ->has('stats.doctors')
            ->has('stats.reviews')
            ->has('stats.patients')
        );
});
