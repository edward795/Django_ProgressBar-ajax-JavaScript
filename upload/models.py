from django.db import models

# Create your models here.
class Upload(models.Model):
    image=models.ImageField(upload_to='upload/pics',blank=True,null=True)

    def __str__(self):
        return str(self.pk)