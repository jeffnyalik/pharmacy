from django.shortcuts import render, get_object_or_404
from rest_framework import permissions
from rest_framework.response import Response
from .serializers import UserSerializer, CompanySerialiazer, CompanyBankSerialiazer, MedicineSerializer
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Company, CompanyBank, Medicine
from rest_framework import status


class UserViews(APIView):
    def get(self, request, format=None):
        user_all = User.objects.all()
        serializers = UserSerializer(user_all, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    
    
class Companyview(APIView):
    def get(self, request, format=None):
        company = Company.objects.all()
        serializer = CompanySerialiazer(company, many=True);
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CompanySerialiazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CompanyDetails(APIView):
    def get(self, request, pk, format=None):
        company = get_object_or_404(Company, pk=pk)
        serializer = CompanySerialiazer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        company = get_object_or_404(Company, pk=pk)
        serializer = CompanySerialiazer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        company = get_object_or_404(Company, pk=pk)
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class CompanyBankView(APIView):
    def get(self, request, format=None):
        companyBank = CompanyBank.objects.all()
        serializer = CompanyBankSerialiazer(companyBank, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = CompanyBankSerialiazer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class CompanyBankDetails(APIView):
    def get(self, request, pk, format=None):
        compBank = get_object_or_404(CompanyBank, pk=pk)
        serializer = CompanyBankSerialiazer(compBank)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        compBank = get_object_or_404(CompanyBank,pk=pk)
        serializer = CompanyBankSerialiazer(compBank, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  
    
    def delete(self, request, pk, format=None):
        compBank = get_object_or_404(CompanyBank, pk=pk)
        compBank.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class MedicineView(APIView):
    def get(self, request, format=None):
        medicine = Medicine.objects.all()
        serializer = MedicineSerializer(medicine, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class MedicineDetailsView(APIView):
    def get(self, request, pk, format=None):
        med = get_object_or_404(Medicine, pk=pk)
        serializer = MedicineSerializer(med)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, pk, format=None):
        med = get_object_or_404(Medicine, pk=pk)
        serializer = MedicineSerializer(med, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        med = get_object_or_404(Medicine, pk=pk)
        med.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)