from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .import views

urlpatterns = [
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/user/', views.UserViews.as_view(), name='users'),
    
    
    ########################
    path('api/v1/company/', views.Companyview.as_view(), name='companies'),
    path('api/v1/company/<int:pk>/', views.CompanyDetails.as_view(), name='company'),
    
    ######################company bank
    path('api/v1/companyBank/', views.CompanyBankView.as_view(), name='company-bank'),
    path('api/v1/companyBank/<int:pk>/', views.CompanyBankDetails.as_view(), name='company-bank-detail'),
    
    #####################medicine
    path('api/v1/medicine/', views.MedicineView.as_view(), name='medicines'),
    path('api/v1/medicine/<int:pk>/', views.MedicineDetailsView.as_view(), name='medicine-detail'),
    
]
