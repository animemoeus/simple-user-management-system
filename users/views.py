from rest_framework import filters
from rest_framework.generics import ListCreateAPIView

from .models import User
from .serializers import UserSerializer


class UserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ["first_name", "last_name", "address"]
