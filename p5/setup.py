import sys
from cx_Freeze import setup, Executable

setup(
    name = "ChessMadHead",
    version = "0.1",
    description = "Play ChessMadHead game in your default browser!!! :)",
    executables = [Executable("ChessMadHead.py", base = "Win32GUI")])