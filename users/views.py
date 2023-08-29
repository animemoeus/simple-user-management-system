from rest_framework import filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import User
from .serializers import UserSerializer


class ListCreateUserView(ListCreateAPIView):
    queryset = User.objects.all().order_by("-id")
    serializer_class = UserSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ["first_name", "last_name", "address"]


class RetrieveUpdateDestroyUserView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
