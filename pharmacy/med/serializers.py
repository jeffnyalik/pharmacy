from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Company, CompanyBank, Medicine


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']
        
class CompanySerialiazer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        
    def to_representation(self, instance):
        
        response = super().to_representation(instance)
        response['bank_id'] = CompanyBankSerialiazer(instance.bank_id).data
        return response
        
class CompanyBankSerialiazer(serializers.ModelSerializer):
    class Meta:
        model = CompanyBank
        fields = '__all__'
        
        
class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'
        
    # def to_representation(self, instance):
    #     response =  super().to_representation(instance)
    #     response['company_id'] = CompanySerialiazer(instance.company_id).data
    #     return response
   