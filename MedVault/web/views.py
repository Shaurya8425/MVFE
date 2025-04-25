from django.shortcuts import render
from django.contrib.auth import login, logout
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.core.files.storage import FileSystemStorage
from .models import User, MedicalRecord, Appointment
from .serializers import UserSerializer, MedicalRecordSerializer, AppointmentSerializer
# Temporarily commenting out QR code functionality
# from pyzbar.pyzbar import decode
# from PIL import Image

# Authentication Views
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

# Medical Records Views
class MedicalRecordListCreateView(generics.ListCreateAPIView):
    serializer_class = MedicalRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'doctor':
            return MedicalRecord.objects.filter(doctor=user)
        return MedicalRecord.objects.filter(patient=user)

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)

class MedicalRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MedicalRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'doctor':
            return MedicalRecord.objects.filter(doctor=user)
        return MedicalRecord.objects.filter(patient=user)

# Appointment Views
class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'doctor':
            return Appointment.objects.filter(doctor=user)
        return Appointment.objects.filter(patient=user)

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'doctor':
            return Appointment.objects.filter(doctor=user)
        return Appointment.objects.filter(patient=user)

# Template Views (for serving HTML templates)
def index(request):
    return render(request, 'try.html')

def doc(request):
    return render(request, 'doctor.html')

def file(request):
    return render(request, "file.html")

def dashboard(request):
    return render(request, "dashboard.html")

def login_view(request):
    return render(request, "login.html")

def ipfs(request):
    return render(request, "ipfs.html")

def landing(request):
    return render(request, "landing.html")

def doclogin(request):
    return render(request, "doclogin.html")