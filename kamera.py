import pygame
import pygame.camera
from pygame.locals import *
from tkinter import  *

class kamera():
    def __init__(self):
        self.penghitung=1
        self.isi = StringVar()
        self.isi.set("Mulai")
        self.ucapan = StringVar()
        self.ucapan.set("Selamat Datang guys.... \n silahkan klik tombol 'mulai' untuk memulai kamera.. \n"
                          "silahkan tekan tombol 'spasi' untuk memotret.. \nsetelah memotret, "
                          "file akan tersimpan dengan nama 'capture.png' \ndi folder tempat file python yang anda simpan")
        self.petunjuk()
        self.tombolMulai()

    def tombolMulai(self):
        mulai = Button(textvariable=self.isi, command=self.jalankanKamera, bg='white', fg='blue', font = "Verdana 10 bold")
        mulai.pack()

    def petunjuk(self):
        self.teks = Label(textvariable=self.ucapan ,fg="white",bg="blue")
        self.teks.pack()
    def jalankanKamera(self):
        DEVICE = '/dev/video0'
        SIZE = (640,480)
        FILENAME = 'capture'+str(self.penghitung)+'.png'
        pygame.init()
        pygame.camera.init()
        display = pygame.display.set_mode(SIZE, 0)
        camera = pygame.camera.Camera(DEVICE, SIZE)
        camera.start()
        screen = pygame.surface.Surface(SIZE, 0, display)
        pygame.display.set_caption("Kamera Gabut qywok")
        capture = True
        while capture:
            screen = camera.get_image(screen)
            display.blit(screen, (0,0))
            pygame.display.flip()
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    capture = False
                elif event.type == pygame.KEYDOWN and event.key == K_SPACE:
                    pygame.image.save(screen, FILENAME)
                    camera.stop()
                    pygame.quit()
                    self.isi.set('Mulai Lagi')
                    self.ucapan.set("Selamat...!! gambar anda telah tersimpan...\n"
                                        "dengan nama 'capture"+str(self.penghitung)+".png' silahkan di cek di \n"
                                        "folder tempat anda menyimpan file python nya..\n"
                                        "Untuk memulai untuk memotret lagi, silahkan tekan\n"
                                        "tombol 'mulai lagi' dan ingat tekan tombol 'spasi'\n"
                                        "untuk mengambil gambar.")
                    self.penghitung+=1
                    return
        camera.stop()
        pygame.quit()
        return

window = Tk()
window.title("Kamera Gabut qywok")
window.configure(background='light blue')
kamera()
mainloop()
