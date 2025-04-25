"""
URL configuration for ehr project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from web import views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    # Authentication endpoints
    path('api/register/', views.UserRegistrationView.as_view(), name='register'),
    path('api/login/', views.UserLoginView.as_view(), name='login'),
    path('api/logout/', views.UserLogoutView.as_view(), name='logout'),
    
    # Medical Records endpoints
    path('api/medical-records/', views.MedicalRecordListCreateView.as_view(), name='medical-records-list'),
    path('api/medical-records/<int:pk>/', views.MedicalRecordDetailView.as_view(), name='medical-records-detail'),
    
    # Appointment endpoints
    path('api/appointments/', views.AppointmentListCreateView.as_view(), name='appointments-list'),
    path('api/appointments/<int:pk>/', views.AppointmentDetailView.as_view(), name='appointments-detail'),
    
    # Template views
    path('main/', views.index, name='home'),
    path('doctor/', views.doc, name='doc'),
    path('file/', views.file, name='file'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login/', views.login_view, name='login'),
    path('', views.landing, name='landing'),
    path('doclogin', views.doclogin, name='doclogin'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)