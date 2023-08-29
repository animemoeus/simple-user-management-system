from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class MyModelAPITest(APITestCase):
    def setUp(self):
        user_1 = User.objects.create(
            first_name="John", last_name="Doe", address="123 Main Street"
        )
        user_2 = User.objects.create(
            first_name="Arter",
            last_name="Tendean ",
            address="Manado, Sulawesi Utara, Indonesia",
        )

        user_3 = User.objects.create(
            first_name="Lorem",
            last_name="Ipsum ",
            address="Dolor Sit Amet",
        )

    def test_get_users(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 3)

    def test_create_user(self):
        data = {"first_name": "Timber", "last_name": "Saw", "address": "Dire"}
        response = self.client.post("/users/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
