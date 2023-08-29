from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import User


class MyModelAPITest(APITestCase):
    def setUp(self):
        self.user_1 = User.objects.create(
            first_name="John", last_name="Doe", address="123 Main Street"
        )
        self.user_2 = User.objects.create(
            first_name="Arter",
            last_name="Tendean ",
            address="Manado, Sulawesi Utara, Indonesia",
        )

        self.user_3 = User.objects.create(
            first_name="Lorem",
            last_name="Ipsum ",
            address="Dolor Sit Amet",
        )

    def test_get_users(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 3)

    def test_search_users(self):
        response = self.client.get("/users/?search=arter")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_user(self):
        data = {"first_name": "Timber", "last_name": "Saw", "address": "Dire"}
        response = self.client.post("/users/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_specific_user(self):
        response = self.client.get(f"/users/{self.user_1.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.user_1.id)

    def test_update_specific_user(self):
        data = {"first_name": "Sanji", "last_name": "Zoro", "address": "Wano"}
        response = self.client.patch(f"/users/{self.user_2.id}/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], data["first_name"])
        self.assertEqual(response.data["last_name"], data["last_name"])
        self.assertEqual(response.data["address"], data["address"])

    def test_delete_specific_user(self):
        response = self.client.delete(f"/users/{self.user_3.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
