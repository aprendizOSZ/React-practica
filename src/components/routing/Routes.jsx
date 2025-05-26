import React from 'react';
import { Routes as ReactRouterRoutes, Route, Navigate } from 'react-router-dom';
import { Index } from '../pages/Index';
import { Info } from '../pages/Info';

export const AppRoutes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/index" element={<Navigate to="/" replace />} />
      <Route path="/info/:id" element={<Info />} />
    </ReactRouterRoutes>
  );
};