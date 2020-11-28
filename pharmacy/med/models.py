from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    license_no = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    contact_no = models.CharField(max_length=255)
    email = models.EmailField()
    description = models.TextField()
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    bank_id = models.ForeignKey('CompanyBank', on_delete=models.CASCADE, null=True)
    objects = models.Manager()
    
    def __str__(self):
        return self.name
    
class Medicine(models.Model):
    name = models.CharField(max_length=255)
    medical_type = models.CharField(max_length=255)
    buy_price = models.CharField(max_length=255)
    sell_price = models.CharField(max_length=255)
    batch_no = models.CharField(max_length=255)
    shelf_no = models.CharField(max_length=255)
    exp_date = models.DateField()
    mfg_date = models.DateField()
    description = models.CharField(max_length=255)
    in_stock_total = models.IntegerField()
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    objects = models.Manager()
    
    
class MedicalDetails(models.Model):
    medicine_id = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    salt_name = models.CharField(max_length=255)
    salt_qty = models.IntegerField()
    salt_qty_type = models.CharField(max_length=100)
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    description = models.TextField()
    objects = models.Manager()
    
    
class Customer(models.Model):
    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=120)
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    objects = models.Manager()
    
class Bill(models.Model):
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    objects = models.Manager()
    
    
class BillDetails(models.Model):
    bill_id = models.ForeignKey(Bill, on_delete=models.CASCADE)
    medicine_id = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    qty = models.IntegerField()
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    objects = models.Manager()


class CustomerRequest(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=120)
    request_date = models.DateField()
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    status = models.BooleanField(default=False)
    medicine_details = models.CharField(max_length=300)
    objects = models.Manager()
    
    
class CompanyBank(models.Model):
    bank_account_no = models.IntegerField()
    bank_name = models.CharField(max_length=120, default='Barclays')
    # company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now=False, auto_now_add=True)
    objects = models.Manager()
    
    def __str__(self):
        return self.bank_name