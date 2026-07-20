"""Deep-learning offline: Transformer (utama) dan LSTM (pembanding)."""
import torch
from torch import nn


class TimeSeriesTransformer(nn.Module):
    def __init__(self, features: int = 1, width: int = 32, heads: int = 4, layers: int = 2):
        super().__init__()
        self.embedding = nn.Linear(features, width)
        encoder = nn.TransformerEncoderLayer(d_model=width, nhead=heads, batch_first=True)
        self.encoder = nn.TransformerEncoder(encoder, num_layers=layers)
        self.output = nn.Linear(width, 1)

    def forward(self, values: torch.Tensor) -> torch.Tensor:
        return self.output(self.encoder(self.embedding(values))[:, -1])


class LSTMForecaster(nn.Module):
    def __init__(self, features: int = 1, width: int = 32):
        super().__init__()
        self.lstm = nn.LSTM(features, width, batch_first=True)
        self.output = nn.Linear(width, 1)

    def forward(self, values: torch.Tensor) -> torch.Tensor:
        _, (hidden, _) = self.lstm(values)
        return self.output(hidden[-1])
