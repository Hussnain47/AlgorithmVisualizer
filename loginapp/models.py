from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from PIL import Image

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)
    image = models.ImageField(default='default.jpg',upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'    

    def save(self,*args,**kwargs):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 150 and img.width >150:
            output_size = (150,150)
            img.thumbnail(output_size)
            img.save(self.image.path)


    



